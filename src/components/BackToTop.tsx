import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const BackToTop: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let busy = false,
      aid: number | null = null;
    let springing = false,
      flying = false;
    let sS = 0,
      sV = 0,
      trailPts: { x: number; y: number }[] = [];
    let plX = 0,
      plY = 0,
      plA = 0,
      plAlpha = 1,
      prevA: number | null = null,
      bankAngle = 0,
      bankV = 0;
    let startTs: number | null = null;
    let P0 = { x: 0, y: 0 },
      P1 = { x: 0, y: 0 },
      P2 = { x: 0, y: 0 },
      P3 = { x: 0, y: 0 };
    const SCALE = 0.9;
    let cv: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let W = 0,
      H = 0;
    let scrollStart = 0,
      scrollTarget = 0;
    let flightCeiling = 26;

    function initCanvas() {
      cv = document.getElementById("bttCanvas") as HTMLCanvasElement;
      if (!cv) return;
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * window.devicePixelRatio;
      cv.height = H * window.devicePixelRatio;
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      ctx = cv.getContext("2d");
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    initCanvas();
    window.addEventListener("resize", initCanvas);

    function bzPt(t: number) {
      const m = 1 - t;
      return {
        x:
          m * m * m * P0.x +
          3 * m * m * t * P1.x +
          3 * m * t * t * P2.x +
          t * t * t * P3.x,
        y:
          m * m * m * P0.y +
          3 * m * m * t * P1.y +
          3 * m * t * t * P2.y +
          t * t * t * P3.y,
      };
    }

    function bzTan(t: number) {
      const m = 1 - t;
      return {
        x:
          3 *
          (m * m * (P1.x - P0.x) +
            2 * m * t * (P2.x - P1.x) +
            t * t * (P3.x - P2.x)),
        y:
          3 *
          (m * m * (P1.y - P0.y) +
            2 * m * t * (P2.y - P1.y) +
            t * t * (P3.y - P2.y)),
      };
    }

    function drawPlane(
      x: number,
      y: number,
      angle: number,
      sc: number,
      alpha: number,
      bank: number,
    ) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.scale(sc, sc);
      ctx.save();
      ctx.globalAlpha = alpha * 0.18;
      ctx.translate(5, 10);
      ctx.scale(1.05, 0.28);
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 13, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#3d3228";
      ctx.fill();
      ctx.restore();
      const bk = Math.cos(bank);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-9, -16 * bk);
      ctx.lineTo(-3, -3);
      ctx.closePath();
      ctx.fillStyle = "#f5f0e2";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-3, 3);
      ctx.lineTo(-9, 16 * bk);
      ctx.closePath();
      ctx.fillStyle = "#a08868";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-3, -3);
      ctx.lineTo(-9, 0);
      ctx.closePath();
      ctx.fillStyle = "#ddd0b8";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-9, 0);
      ctx.lineTo(-3, 3);
      ctx.closePath();
      ctx.fillStyle = "#c0a888";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, -3);
      ctx.lineTo(-9, -16 * bk);
      ctx.lineTo(-9, 0);
      ctx.closePath();
      ctx.fillStyle = "#cfc0a0";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-3, 3);
      ctx.lineTo(-9, 0);
      ctx.lineTo(-9, 16 * bk);
      ctx.closePath();
      ctx.fillStyle = "#b09070";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-9, 0);
      ctx.globalAlpha = alpha * 0.85;
      ctx.strokeStyle = "#7a6050";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.lineTo(-9, -16 * bk);
      ctx.globalAlpha = alpha * 0.35;
      ctx.strokeStyle = "rgba(255,250,238,.9)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    }

    function drawTrail(alpha: number, prog: number) {
      if (!ctx || trailPts.length < 2) return;

      /* Calcul de la longueur totale du sillage parcouru */
      let totalLen = 0;
      const lens = [0];
      for (let i = 1; i < trailPts.length; i++) {
        const dx = trailPts[i].x - trailPts[i - 1].x;
        const dy = trailPts[i].y - trailPts[i - 1].y;
        totalLen += Math.sqrt(dx * dx + dy * dy);
        lens.push(totalLen);
      }

      const DASH = 5,
        GAP = 9;
      const unit = DASH + GAP;

      /* L'offset est calé sur la longueur parcourue :
         les tirets "naissent" à la queue et progressent vers la tête.
         On aligne le dernier tiret exactement sur la position de l'avion. */
      const offset = -(totalLen % unit);

      ctx.save();
      ctx.setLineDash([DASH, GAP]);
      ctx.lineDashOffset = offset;

      /* Opacité décroissante de la tête vers la queue */
      const grad = ctx.createLinearGradient(
        trailPts[0].x,
        trailPts[0].y,
        trailPts[trailPts.length - 1].x,
        trailPts[trailPts.length - 1].y
      );
      grad.addColorStop(0, "rgba(61,50,40,0)");
      grad.addColorStop(0.4, "rgba(61,50,40," + alpha * 0.3 + ")");
      grad.addColorStop(1, "rgba(61,50,40," + alpha * 0.7 + ")");

      ctx.globalAlpha = 1;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(trailPts[0].x, trailPts[0].y);
      for (let j = 1; j < trailPts.length; j++)
        ctx.lineTo(trailPts[j].x, trailPts[j].y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function tick(ts: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      /* Phase 1 : pop-in élastique */
      if (springing) {
        const dt = 0.016;
        sV += (300 * (1 - sS) - 26 * sV) * dt;
        sS += sV * dt;
        drawPlane(plX, plY, plA, Math.max(0, sS) * SCALE, 1, 0);
        if (Math.abs(1 - sS) < 0.01 && Math.abs(sV) < 0.01) {
          springing = false;
          flying = true;
          startTs = ts;
          trailPts = [{ x: plX, y: plY }];
        }
        aid = requestAnimationFrame(tick);
        return;
      }

      /* Phase 2 : vol + scroll synchronisés */
      if (flying) {
        if (!startTs) startTs = ts;
        const prog = Math.min((ts - startTs) / 1980, 1);
        /* ease-in-out cubic — même courbe pour avion ET scroll */
        const e =
          prog < 0.5
            ? 4 * prog * prog * prog
            : 1 - Math.pow(-2 * prog + 2, 3) / 2;

        /* ── SCROLL synchronisé : même easing que l'avion ── */
        window.scrollTo(0, scrollStart + (scrollTarget - scrollStart) * e);

        const pos = bzPt(e);
        const tan = bzTan(e);
        pos.y += Math.sin(prog * Math.PI * 2.8) * 1.6;
        plX = pos.x;
        plY = pos.y;
        plA = Math.atan2(tan.y, tan.x);

        let angleDiff = 0;
        if (prevA !== null) {
          angleDiff = plA - prevA;
          while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
          while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
        }
        bankV += (angleDiff * 22 - bankAngle) * 0.28 - bankV * 0.35;
        bankAngle += bankV;
        bankAngle = Math.max(-0.9, Math.min(0.9, bankAngle));
        prevA = plA;

        plAlpha = prog > 0.7 ? 1 - (prog - 0.7) / 0.3 : 1;
        if (pos.y <= flightCeiling + 56) {
          plAlpha *= Math.max(0, Math.min(1, (pos.y - flightCeiling) / 56));
        }

        const lp = trailPts[trailPts.length - 1],
          dx = pos.x - lp.x,
          dy = pos.y - lp.y;
        if (dx * dx + dy * dy > 12) {
          trailPts.push({ x: pos.x, y: pos.y });
          if (trailPts.length > 160) trailPts.shift();
        }

        drawTrail(plAlpha, prog);
        drawPlane(plX, plY, plA, SCALE, plAlpha, bankAngle);

        if (prog < 1) {
          aid = requestAnimationFrame(tick);
        } else {
          /* Fin : forcer scroll à 0, réafficher le bouton */
          window.scrollTo(0, 0);
          flying = false;
          ctx.clearRect(0, 0, W, H);
          const btn = document.getElementById("backToTopBtn");
          if (btn) {
            btn.style.visibility = "visible";
            const t = btn.querySelector(".btt-top"),
              b = btn.querySelector(".btt-bot");
            if (t && b) {
              t.classList.remove("fold");
              b.classList.remove("fold");
              t.classList.add("reform");
              b.classList.add("reform");
              t.addEventListener(
                "animationend",
                function () {
                  t.classList.remove("reform");
                  b.classList.remove("reform");
                  busy = false;
                },
                { once: true },
              );
            } else {
              busy = false;
            }
          } else {
            busy = false;
          }
        }
        return;
      }
    }

    (window as any).bttLaunch = function () {
      if (busy) return;
      if (prefersReducedMotion) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      busy = true;
      const btn = document.getElementById("backToTopBtn");
      if (!btn) return;
      const t = btn.querySelector(".btt-top");
      const b = btn.querySelector(".btt-bot");
      if (t) t.classList.add("fold");
      if (b) b.classList.add("fold");

      setTimeout(function () {
        btn.style.visibility = "hidden";
        initCanvas();

        /* Capturer la position de scroll actuelle AVANT tout mouvement */
        scrollStart =
          window.pageYOffset || document.documentElement.scrollTop;
        scrollTarget = 0;

        const br = btn.getBoundingClientRect();
        const nav = document.querySelector(".nav") as HTMLElement | null;
        const navRect = nav?.getBoundingClientRect();
        flightCeiling = Math.max(26, (navRect?.bottom ?? 0) + 64);
        /* Position de l'avion = position visuelle du bouton sur l'écran */
        const sx = br.left + br.width / 2;
        const sy = br.top + br.height / 2;

        P0 = { x: sx, y: sy };
        P1 = {
          x: sx - W * 0.2,
          y: sy - H * 0.24,
        };
        P2 = {
          x: sx + W * 0.12,
          y: Math.max(flightCeiling + 52, sy - H * 0.5),
        };
        P3 = { x: sx + W * 0.01, y: flightCeiling + 22 };

        plX = sx;
        plY = sy;
        plA = Math.atan2(P1.y - P0.y, P1.x - P0.x);
        sS = 0;
        sV = 0;
        bankAngle = 0;
        bankV = 0;
        prevA = null;
        springing = true;
        flying = false;
        trailPts = [];
        startTs = null;

        if (aid) cancelAnimationFrame(aid);
        aid = requestAnimationFrame(tick);
      }, 320);
    };

    return () => {
      window.removeEventListener("resize", initCanvas);
      if (aid) cancelAnimationFrame(aid);
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <div className="back-to-top-container">
        <button
          id="backToTopBtn"
          className="back-to-top-btn"
          onClick={() => (window as any).bttLaunch()}
        >
          <span className="btt-half btt-top">↑ HAUT</span>
          <span className="btt-half btt-bot">DE PAGE</span>
        </button>
      </div>
      {createPortal(
        <canvas
          id="bttCanvas"
          className="btt-canvas"
        ></canvas>,
        document.body,
      )}
    </>
  );
};

export default BackToTop;

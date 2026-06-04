// components/ui/modal.tsx
"use client";

import { ReactNode, useEffect } from "react";

type Animation =
  | "fade"
  | "scale"
  | "slide-up"
  | "slide-down";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  animation?: Animation;
  dismissable?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  title,
  animation = "scale",
  dismissable= true,
}: ModalProps) {
  // Fermer avec ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && dismissable) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  const getAnimationStyle = (): React.CSSProperties => {
    switch (animation) {
      case "fade":
        return {
          animation: "fadeIn 0.2s ease-out",
        };

      case "scale":
        return {
          animation: "scaleIn 0.25s ease-out",
        };

      case "slide-up":
        return {
          animation: "slideUp 0.3s ease-out",
        };

      case "slide-down":
        return {
          animation: "slideDown 0.3s ease-out",
        };

      default:
        return {};
    }
  };

  return (
    <>
      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translate(-50%, calc(-50% + 40px));
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translate(-50%, calc(-50% - 40px));
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
        `}
      </style>

      {/* Overlay */}
      <div
        onClick={dismissable ? onClose : undefined}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 999,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95vw",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          zIndex: 1000,
          ...getAnimationStyle(),
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {title && (
            <h2
              style={{
                margin: 0,
                fontSize: "1.25rem",
              }}
            >
              {title}
            </h2>
          )}

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </>
  );
}
import type { KaboomCtx } from "kaboom";
import { useCallback } from "react";

function world(k: KaboomCtx) {
  k.add([k.rect(100, 100), k.pos(k.center())])
}

export const useWorld = (k: KaboomCtx) => {
  return useCallback(() => {
    world(k);
  }, [k]);
};
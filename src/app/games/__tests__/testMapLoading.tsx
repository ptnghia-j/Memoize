// testing fetch function loading map data

import { fetchMapData } from "../lib/utils";

describe("fetchMapData", () => {
  it("returns a map", async () => {
    const map = await fetchMapData("/assets/maps/world.json")
    expect(map).toBeDefined()
  })
})
# Visual references

These 13 PNG files were captured by the pinned Playwright Chromium browser on
GitHub's Ubuntu runner, using source commit `71e745d`. The capture tool waits for
local fonts, decoded images and a stable layout before saving each viewport.

Source run: [41151837875](https://github.com/veryfunstudio/veryfunstudio.github.io/actions/runs/41151837875),
artifact `visual-baseline-captures`. Rendering and settled animation states are
browser- and viewport-specific, so a capture from a different environment is
expected to differ.

Run the **Visual baseline** workflow with `update=false` to compare fresh Linux
captures against these references. Prefer that environment for updates; macOS
font rasterization can differ. Review the `visual-baseline-captures` and diff
artifacts before accepting a new reference. Keep the RMSE threshold unchanged.

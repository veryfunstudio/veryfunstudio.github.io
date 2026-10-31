# Visual references

These 13 PNG files were captured by the pinned Playwright Chromium browser on
GitHub's Ubuntu runner, using source commit `71e745d`. The capture tool waits for
local fonts, decoded images and a stable layout before saving each viewport.

Source run: [41151837875](https://github.com/veryfunstudio/veryfunstudio.github.io/actions/runs/41151837875),
artifact `visual-baseline-captures`. Its comparison against the previous Chrome
CLI references is expected to differ: browser rendering and settled animation
states changed. The captured pages were reviewed before replacing those files.

Run the **Visual baseline** workflow with `update=false` to compare fresh Linux
captures against these references. Prefer that environment for updates; macOS
font rasterization can differ. Review the `visual-baseline-captures` and diff
artifacts before accepting a new reference. Keep the RMSE threshold unchanged.

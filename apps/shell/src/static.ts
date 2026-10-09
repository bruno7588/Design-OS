// The shared site (Phase 4d) is a read-only build: VITE_STATIC=1 from scripts/build-site.mts.
// It reads exported JSON instead of the Design OS server, shows only Components and Prototypes,
// and hides everything that writes (Save Version, Duplicate, comments, the terminal).
export const STATIC = import.meta.env.VITE_STATIC === '1'

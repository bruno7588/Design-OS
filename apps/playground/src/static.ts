// The shared site (Phase 4d) builds the playground read-only under /playground/ (VITE_STATIC=1,
// VITE_BASE=/playground/): no comment layer, no server.
export const STATIC = import.meta.env.VITE_STATIC === '1'

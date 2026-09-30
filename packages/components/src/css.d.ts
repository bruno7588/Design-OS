// Side-effect stylesheet imports (Poppins via @fontsource). The bundler handles them.
declare module '*.css'
// Illustration files (the bundler serves them as URLs).
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}

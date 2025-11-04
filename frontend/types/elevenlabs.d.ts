declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'agent-id': string
        'widget-language'?: string
        'widget-button-label'?: string
        'avatar-label'?: string
      },
      HTMLElement
    >
  }
}

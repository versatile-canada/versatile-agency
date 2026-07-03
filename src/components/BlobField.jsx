import React from 'react'

/**
 * Three oversized, slow-drifting radial-gradient blobs that sit behind the
 * hero's glass panels. This is the page's signature element: the "liquid"
 * half of liquid glass — everything glass-surfaced elsewhere on the page
 * either sits directly on this field or references its palette.
 */
export default function BlobField() {
  return (
    <div className="blob-field">
      <div
        className="blob blob-a"
        style={{
          top: '5%',
          left: '8%',
          width: '46vw',
          height: '46vw',
          background: 'radial-gradient(circle, #4C6FFF 0%, transparent 70%)'
        }}
      />
      <div
        className="blob blob-b"
        style={{
          top: '20%',
          right: '2%',
          width: '40vw',
          height: '40vw',
          background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)'
        }}
      />
      <div
        className="blob blob-c"
        style={{
          bottom: '-5%',
          left: '30%',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, #FF4FA3 0%, transparent 70%)'
        }}
      />
    </div>
  )
}

import React from 'react';

const Notice = () => (
  <div
    css={{
      alignItems: 'center',
      backgroundColor: '#dab02e',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '1.1rem',
      padding: '0.5rem',
      textAlign: 'center',
    }}
  >
    <div>
      The team is aware of the issues with missing data, and we are working hard
      on the upgraded version of the tracker.
    </div>
    <div css={{ marginTop: '4px' }}>
      Sorry about the inconvenience and stay tuned for the rollout soon!
    </div>
  </div>
);

export default Notice;

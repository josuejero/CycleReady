module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/CycleReady/',
        'http://localhost:4173/CycleReady/release-room.html',
        'http://localhost:4173/CycleReady/release-summary.html'
      ],
      startServerCommand: 'npm run preview -- --host 0.0.0.0 --port 4173',
      startServerReadyPattern: 'Local:',
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.8 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lighthouse'
    }
  }
};

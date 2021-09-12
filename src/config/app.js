export const app = {
    title: 'Air Quality Monitoring',
    socket_server_url: 'wss://city-ws.herokuapp.com',
    categories: [
      { type: 'good', start: 0, end: 50, color: '#52b157' },
      { type: 'satisfactory', start: 51, end: 100, color: '#a6d86f' },
      { type: 'moderate', start: 101, end: 200, color: '#ffb83e' },
      { type: 'poor', start: 201, end: 300, color: '#8B8000' },
      { type: 'very poor', start: 301, end: 400, color: '#ff4500' },
      { type: 'severe', start: 401, end: 500, color: '#f1011e' },
    ],
  };
  
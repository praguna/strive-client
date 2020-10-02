import express from 'express';
const app = express()
app.use(express.static('./dist/strive'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/strive/'}
  );
});
app.listen(process.env.PORT || 8080);
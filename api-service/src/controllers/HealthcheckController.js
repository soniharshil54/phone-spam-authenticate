module.exports = {
    healthcheck: (req, res) => {
        res.json({ status: 'ok' });
    }
}
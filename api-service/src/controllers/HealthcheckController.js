module.exports = {
    healthcheck: (req, res) => {
        res.ok({
            status: 'ok',
        });
    }
}
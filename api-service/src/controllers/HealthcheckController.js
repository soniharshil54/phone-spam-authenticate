module.exports = {
    healthcheck: (req, res) => {
        res.ok({
            status: 'ok 6',
            version: '1.3.0'
        });
    }
}
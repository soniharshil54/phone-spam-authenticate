module.exports = {
    healthcheck: (req, res) => {
        res.ok({
            status: 'ok 6',
            version: '1.2.0'
        });
    }
}
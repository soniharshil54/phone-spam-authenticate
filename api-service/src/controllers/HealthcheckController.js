module.exports = {
    healthcheck: (req, res) => {
        res.ok({
            status: 'ok 6',
            version: 'v1.2.38'
        });
    }
}
const latestCurrenciesRate = async (req, res) => {
    try {
        const latestRates = undefined;
        res.status(200).json({
            code: 200,
            success:true,
            currencies: latestRates,
        })
    } catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message
        });
    }
};

export default latestCurrenciesRate;
import convertV1 from "../services/convertV1.js";

const conversionControllerV1 = async (req, res) => {
    try {
        const {base, target, amount = 1} = req.query;
        const conversionResult = await convertV1(base.toUpperCase(), target.toUpperCase(), amount);
        return res.status(200).json(conversionResult)
    }catch (error) {
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
        });
    }
}
export default conversionControllerV1;
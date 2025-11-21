export default function RequestParameters(app) {
  const calculator = (req, res) => {
    try {
      // Extract from JSON body (POST request)
      const { operation, a, b } = req.body;
      
      // Validate inputs
      if (!operation || a === undefined || b === undefined) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      const numA = parseFloat(a);
      const numB = parseFloat(b);

      if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({ error: 'Invalid numbers' });
      }

      let result;
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            return res.status(400).json({ error: "Division by zero" });
          }
          result = numA / numB;
          break;
        default:
          return res.status(400).json({ error: "Invalid operation" });
      }
      
      res.json({ operation, a: numA, b: numB, result });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };

  // POST endpoint to match  client
  app.post('/lab5/calculator', calculator);
}
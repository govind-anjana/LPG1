import ClickModel from "../module/ClickatellSmsModule.js";
export const ClickatellSms=
        async (req, res) => {
          const data = req.body;
          try {
            const newadd = new ClickModel(data);
            const saveUser = await newadd.save();
            console.log(saveUser);
            res.status(201).json({ message: "Data Sunmit", data: saveUser });
          } catch (err) {
            console.error(" Save error:", err.message);
            res.status(500).json({ message: "Failed to save", error: err.message });
          }
        };     

import { Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IItem } from "../../components/interfaces/ITimeLine";
import Timeline from "../../components/Timeline";

function News() {
  const initialFormDefaultValues: IItem[] = [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const position = sessionStorage.getItem("position");

  const [timeLineData, setTimeLineData] = useState<IItem[]>(
    initialFormDefaultValues
  );

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7198/news/create-news",
        {
          name: name,
          description: description,
        }
      );
      console.log(response.data);
      const responseItem: IItem = response.data;
      setTimeLineData((timeLineData) => [responseItem, ...timeLineData]);
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get<IItem[]>(`https://localhost:7198/news/all`, {}).then(
      (response) => {
        setTimeLineData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Paper
        sx={{
          maxWidth: 1400,
          margin: "auto",
          overflow: "hidden",
          backgroundColor: "#e0e8eb",
        }}
        elevation={0}
      >
        <Timeline items={timeLineData} />
        {position === "1" && (
          <>
            <TextField
              fullWidth
              label="Naujienos pavadinimas"
              onChange={(e) => setName(e.target.value)}
              sx={{ marginTop: 2 }}
              value={name}
            />
            <TextField
              fullWidth
              label="Naujienos kontentas"
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginTop: 2 }}
              multiline
              maxRows={5}
              value={description}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 5 }}
            >
              Pridėti naujieną
            </Button>
          </>
        )}
      </Paper>
    </>
  );
}

export default News;

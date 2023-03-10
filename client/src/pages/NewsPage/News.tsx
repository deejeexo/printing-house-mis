import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { IItem } from "../../components/interfaces/ITimeLine";
import Timeline from "../../components/Timeline";

function News() {
  const initialFormDefaultValues: IItem[] = [];

  const [timeLineData, setTimeLineData] = useState<IItem[]>(
    initialFormDefaultValues
  );

  useEffect(() => {
    const newTimeline: IItem[] = [
      {
        orderNo: 1,
        date: "2023-02-03",
        title: "Naujo produkto pristatymas",
        content:
          "Džiaugiamės galėdami pranešti, kad pristatome naują ekologiškų spausdinimo produktų liniją. Šie gaminiai pagaminti iš tvarių medžiagų ir sukurti taip, kad kuo labiau sumažintų mūsų poveikį aplinkai. Užsisakykite dabar ir padarykite teigiamą pokytį planetai!",
      },
      {
        orderNo: 2,
        date: "2023-02-12",
        title: "Speciali nuolaida [nuo 2023-02-13 iki [2023-02-15]",
        content:
          "Švęsdami savo 1 metų sukaktuves, siūlome specialią nuolaidą visiems šį mėnesį pateiktiems užsakymams. Nepraleiskite šio riboto laiko pasiūlymo!",
      },
      {
        orderNo: 3,
        date: "2023-02-15",
        title: "Patobulintas užsakymų stebėjimas",
        content:
          "Užsakymų sekimo sistema gerokai patobulinta, kad galėtumėte realiuoju laiku gauti naujausią informaciją apie savo užsakymo būseną. Dabar galite tiksliai matyti, kurioje gamybos proceso stadijoje yra jūsų užsakymas ir kada jis bus pristatytas.",
      },
      {
        orderNo: 4,
        date: "2023-02-18",
        title: "Atostogų uždarymas",
        content:
          "Atkreipiame dėmesį, kad mūsų spaustuvė nedirbs vasario 15 d. Visi užsakymai, pateikti šią dieną arba vėliau, bus apdoroti, kai grįšime vasario 18 d. Atsiprašome už nepatogumus ir dėkojame už supratimą.",
      },
      {
        orderNo: 5,
        date: "2023-02-21",
        title: "Atnaujinta privatumo politika",
        content:
          "Atnaujinome savo privatumo politiką, kad būtų atsižvelgta į duomenų apsaugos įstatymų pakeitimus. Būkite tikri, kad rimtai vertiname jūsų privatumą ir duomenų saugumą ir esame įsipareigoję saugoti jūsų asmeninę informaciją. Su atnaujinta privatumo politika galite susipažinti mūsų svetainėje.",
      },
    ];
    newTimeline.sort((a, b) => b.orderNo - a.orderNo);
    setTimeLineData(newTimeline);
  }, []);

  return (
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
    </Paper>
  );
}

export default News;

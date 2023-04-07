import { Typography } from "@mui/material";
import { BarChart, Card, Grid, Metric, Text, Title } from "@tremor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { IJobStatusStatistics } from "../../components/interfaces/Statistics/IJobStatusStatistics";
import { ITotalCostumers } from "../../components/interfaces/Statistics/ITotalCostumers";
import { ITotalEmployees } from "../../components/interfaces/Statistics/ITotalEmployees";
import { ITotalJobs } from "../../components/interfaces/Statistics/ITotalJobs";
import { IJobAverageRating } from "../../components/interfaces/Statistics/IJobsAverageRating";
import { IJobsRevenue } from "../../components/interfaces/Statistics/IJobsRevenue";

function StatisticsPage() {
  const [totalCostumers, setTotalCostumers] = useState<ITotalCostumers>();
  const [totalEmployees, setTotalEmployees] = useState<ITotalEmployees>();
  const [totalJobs, setTotalJobs] = useState<ITotalJobs>();
  const [jobsStatuses, setJobsStatuses] = useState<IJobStatusStatistics>();
  const [jobsAverageRating, setJobsAverageRating] =
    useState<IJobAverageRating>();
  const [jobsRevenue, setJobsRevenue] = useState<IJobsRevenue>();

  const dataFormatter = (number: number) => {
    return Intl.NumberFormat("us").format(number).toString();
  };

  const jobStatusStatisticsChartData = [
    {
      name: "Naujas",
      "Užsakymų kiekis": jobsStatuses?.new,
    },
    {
      name: "Atidėtas",
      "Užsakymų kiekis": jobsStatuses?.delayed,
    },
    {
      name: "Užbaigtas",
      "Užsakymų kiekis": jobsStatuses?.completed,
    },
    {
      name: "Atšauktas",
      "Užsakymų kiekis": jobsStatuses?.cancelled,
    },
    {
      name: "Laukia patvirtinimo",
      "Užsakymų kiekis": jobsStatuses?.pendingApproval,
    },
    {
      name: "Patvirtintas",
      "Užsakymų kiekis": jobsStatuses?.approved,
    },
  ];

  const secondJobStatusStatisticsChartData = [
    {
      name: "Paruoštas spausdinimui",
      "Užsakymų kiekis": jobsStatuses?.readyForPrinting,
    },
    {
      name: "Spausdinamas",
      "Užsakymų kiekis": jobsStatuses?.printing,
    },
    {
      name: "Kokybės kontrolė",
      "Užsakymų kiekis": jobsStatuses?.qualityControl,
    },
    {
      name: "Užbaigiamas",
      "Užsakymų kiekis": jobsStatuses?.finishing,
    },
    {
      name: "Pakuojamas",
      "Užsakymų kiekis": jobsStatuses?.packaging,
    },
    {
      name: "Išsiųstas pirkėjui",
      "Užsakymų kiekis": jobsStatuses?.shipping,
    },
    {
      name: "Pristatytas",
      "Užsakymų kiekis": jobsStatuses?.delivered,
    },
    {
      name: "Laukia apmokėjimo",
      "Užsakymų kiekis": jobsStatuses?.billing,
    },
    {
      name: "Apmokėjimas gautas",
      "Užsakymų kiekis": jobsStatuses?.paymentReceived,
    },
    {
      name: "Archyvuotas",
      "Užsakymų kiekis": jobsStatuses?.archived,
    },
  ];

  useEffect(() => {
    axios
      .get<ITotalCostumers>(
        `https://localhost:7198/statistics/totalCostumers`,
        {}
      )
      .then(
        (response) => {
          setTotalCostumers(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get<IJobsRevenue>(`https://localhost:7198/statistics/jobsRevenue`, {})
      .then(
        (response) => {
          setJobsRevenue(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get<ITotalEmployees>(
        `https://localhost:7198/statistics/totalEmployees`,
        {}
      )
      .then(
        (response) => {
          setTotalEmployees(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get<ITotalJobs>(`https://localhost:7198/statistics/totalJobs`, {})
      .then(
        (response) => {
          setTotalJobs(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get<IJobAverageRating>(
        `https://localhost:7198/statistics/jobsAverageRating`,
        {}
      )
      .then(
        (response) => {
          setJobsAverageRating(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    axios
      .get<IJobStatusStatistics>(
        `https://localhost:7198/statistics/jobStatusStatistics`,
        {}
      )
      .then(
        (response) => {
          setJobsStatuses(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Pagrindinė statistika
      </Typography>
      <Grid numColsSm={2} numColsLg={3} className="gap-6">
        <Card>
          <Text>Klientų kiekis</Text>
          <Metric>{totalCostumers?.totalCostumers} klientai</Metric>
        </Card>
        <Card>
          <Text>Aktyvių darbuotojų kiekis</Text>
          <Metric>{totalEmployees?.totalEmployees} darbuotojai</Metric>
        </Card>
        <Card>
          <Text>Registruotų užsakymų kiekis spaustuvėje</Text>
          <Metric>{totalJobs?.totalJobs} užsakymai</Metric>
        </Card>
      </Grid>
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
        Spaustuvės užsakymų statistika
      </Typography>
      <Grid numColsSm={2} numColsLg={3} className="gap-6 mb-5">
        <Card>
          <Text>Užsakymų vidutinis įvertinimas</Text>
          <Metric>{jobsAverageRating?.averageRating} / 5</Metric>
        </Card>
        <Card>
          <Text>Bendros įplaukos iš atliktų darbų</Text>
          <Metric>{jobsRevenue?.jobsRevenue} €</Metric>
        </Card>
        <Card>
          <Text>Vidutinės įplaukos</Text>
          <Metric>{jobsRevenue?.jobsAverageRevenue} €</Metric>
        </Card>
      </Grid>
      <Card>
        <Title>Registruotų užsakymų būsenų statistika</Title>
        <BarChart
          data={jobStatusStatisticsChartData}
          index="name"
          categories={["Užsakymų kiekis"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
        <BarChart
          data={secondJobStatusStatisticsChartData}
          index="name"
          categories={["Užsakymų kiekis"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </>
  );
}

export default StatisticsPage;

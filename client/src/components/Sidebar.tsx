import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LogoComponent from "../assets/LogoComponent";
import { ISidebarCategories } from "./interfaces/ISidebarCategories";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";

function Sidebar(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { item, itemCategory } = setItemAnditemCategory();
  const [categories, setCategories] = useState<ISidebarCategories[]>([]);

  useEffect(() => {
    setCategories([
      {
        id: "Pagrindinis meniu",
        children: [
          {
            id: "Naujienos",
            icon: <NewspaperRoundedIcon />,
            active: true,
            navigateTo: "/news",
            allowedCategories: [0],
          },
        ],
      },
      {
        id: "Mano užsakymų valdymas",
        children: [
          {
            id: "Naujas užsakymas",
            icon: <AddBoxRoundedIcon />,
            active: false,
            navigateTo: "/neworder",
            allowedCategories: [0],
          },
          {
            id: "Mano užsakymai",
            icon: <ReorderRoundedIcon />,
            active: false,
            navigateTo: "/orders",
            allowedCategories: [0],
          },
        ],
      },
      {
        id: "Verslo valdymas",
        children: [
          {
            id: "Užsakymų valdymas",
            icon: <BorderColorRoundedIcon />,
            active: false,
            navigateTo: "/ordersmanager",
            allowedCategories: [0],
          },
          {
            id: "Darbuotojų valdymas",
            icon: <PeopleAltRoundedIcon />,
            active: false,
            navigateTo: "/employeesmanager",
            allowedCategories: [0],
          },
          {
            id: "Įrangos valdymas",
            icon: <LocalPrintshopRoundedIcon />,
            active: false,
            navigateTo: "/equipmentmanager",
            allowedCategories: [0],
          },
          {
            id: "Eksploatacinės medžiagos",
            icon: <ConstructionRoundedIcon />,
            active: false,
            navigateTo: "/consumablemanager",
            allowedCategories: [0],
          },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setCategories((prevCategories) => {
      return prevCategories
        .filter((category) => {
          return category.children.some((child) =>
            child.allowedCategories.includes(parseInt(role || "0"))
          );
        })
        .map((category) => {
          return {
            ...category,
            children: category.children.map((child) => {
              if (child.navigateTo === location.pathname) {
                return {
                  ...child,
                  active: true,
                };
              }
              return {
                ...child,
                active: false,
              };
            }),
          };
        });
    });
  }, [location.pathname]);

  const handleCategoryClick = (id: string, navigateTo: string) => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        return {
          ...category,
          children: category.children.map((child) => {
            if (child.id === id) {
              return {
                ...child,
                active: true,
              };
            }
            return {
              ...child,
              active: false,
            };
          }),
        };
      });
    });
    navigate(navigateTo);
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          <ListItemButton>
            <LogoComponent color="white" />
          </ListItemButton>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active, navigateTo }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton
                  selected={active}
                  sx={item}
                  onClick={() => handleCategoryClick(childId, navigateTo)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;

function setItemAnditemCategory() {
  const item = {
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
      bgcolor: "rgba(255, 255, 255, 0.08)",
    },
  };

  const itemCategory = {
    px: 3,
  };
  return { item, itemCategory };
}

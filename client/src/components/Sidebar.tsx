import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
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
import { useNavigate } from "react-router-dom";
import LogoComponent from "../assets/LogoComponent";
import { ISidebarCategories } from "./interfaces/ISidebarCategories";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

function Sidebar(props: DrawerProps) {
  const { ...other } = props;
  const navigate = useNavigate();
  const { item, itemCategory } = setItemAnditemCategory();
  const [categories, setCategories] = useState<ISidebarCategories[]>([]);

  useEffect(() => {
    setCategories([
      {
        id: "Mano užsakymų valdymas",
        children: [
          {
            id: "Naujas užsakymas",
            icon: <AddBoxRoundedIcon />,
            active: true,
            navigateTo: "/home",
          },
          {
            id: "Mano užsakymai",
            icon: <ReorderRoundedIcon />,
            active: false,
            navigateTo: "/orders",
          },
        ],
      },
      {
        id: "Verslo valdymas",
        children: [
          {
            id: "Darbuotojų valdymas",
            icon: <PeopleAltRoundedIcon />,
            active: false,
            navigateTo: "/employeesmanager",
          },
          {
            id: "Įrangos valdymas",
            icon: <LocalPrintshopRoundedIcon />,
            active: false,
            navigateTo: "/equipmentmanager",
          },
          {
            id: "Eksploatacinės medžiagos",
            icon: <ConstructionRoundedIcon />,
            active: false,
            navigateTo: "/consumablemanager",
          },
        ],
      },
    ]);
  }, []);

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

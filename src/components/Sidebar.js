// src/layout/Sidebar.js

import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  People,
  Work,
  CompareArrows,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

const menuStructure = [
  {
    title: "Fusion",
    icon: <Work />,
    items: [
      { label: "Employees", to: "/fusion/employees", icon: <People /> },
      { label: "Positions", to: "/fusion/positions", icon: <Work /> },
      { label: "Jobs", to: "/fusion/jobs", icon: <Work /> },
    ],
  },
  {
    title: "DarwinBox",
    icon: <Work />,
    items: [
      { label: "Employees", to: "/darwinbox/employees", icon: <People /> },
      { label: "Positions", to: "/darwinbox/positions", icon: <Work /> },
      { label: "Jobs", to: "/darwinbox/jobs", icon: <Work /> },
      { label: "Designations", to: "/darwinbox/designatons", icon: <Work /> },
    ],
  },
  {
    title: "Compare",
    icon: <CompareArrows />,
    items: [
      { label: "Employees", to: "/compare/employees", icon: <CompareArrows /> },
      { label: "Positions", to: "/compare/positions", icon: <CompareArrows /> },
      { label: "Jobs", to: "/compare/jobs", icon: <CompareArrows /> },
    ],
  },
];

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 1,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menuStructure.map(({ title, icon, items }) => (
            <Box key={title}>
              <ListItemButton
                onClick={() => toggleSection(title)}
                sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
              >
                <Tooltip title={collapsed ? title : ""} placement="right">
                  <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2 }}>
                    {icon}
                  </ListItemIcon>
                </Tooltip>
                {!collapsed && <ListItemText primary={title} />}
                {!collapsed &&
                  (openSections[title] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>

              <Collapse
                in={!collapsed && openSections[title]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {items.map(({ label, to, icon }) => (
                    <ListItemButton
                      key={label}
                      component={NavLink}
                      to={to}
                      selected={isActive(to)}
                      sx={{
                        pl: 4,
                        "&.Mui-selected": {
                          backgroundColor: "action.selected",
                          fontWeight: "bold",
                        },
                      }}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>

      {/* <Box
        sx={{
          p: collapsed ? 1 : 2,
          borderTop: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <Avatar sx={{ width: 32, height: 32, mr: collapsed ? 0 : 1 }}>
          <AccountCircle />
        </Avatar>
        {!collapsed && (
          <Box>
            <Typography variant="body2">John Doe</Typography>
            <Typography variant="caption" color="text.secondary">
              HR Manager
            </Typography>
          </Box>
        )}
      </Box> */}
    </Box>
  );
};

export default Sidebar;

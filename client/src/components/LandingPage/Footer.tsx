import { Link, Typography } from "@mui/material";

function Footer() {
  return (
    <footer className="bg-gray-200 text-center lg:text-left">
      <div className="text-gray-700 text-center p-4">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            PrintHaus
          </Link>{" "}
          {new Date().getFullYear()}.
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;

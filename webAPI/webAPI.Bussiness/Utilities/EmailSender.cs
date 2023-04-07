using System;
using System.Net;
using System.Net.Mail;

namespace webAPI.Bussiness.Utilities
{
	public class EmailSender
	{

        public static void SendBillingEmail(string customerEmail, string jobName)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("devidas.vgtu.practice@gmail.com");
                mailMessage.To.Add(customerEmail);
                mailMessage.Subject = $"Jūsų užsakymas #{jobName} yra paruoštas!";
                mailMessage.Body = $"Sveiki, norime pranešti, kad jūsų užsakymas - #{jobName} buvo paruoštas ir yra laukiamas apmokėjimas. Sąskaitos faktūrą galite rasti prisijungę prie savo paskyros ir paspaudę ant užsakymo.";

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("devidas.vgtu.practice@gmail.com", "duwgghdsucofagun");
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static void SendPaymentReceivedEmail(string customerEmail, string jobName)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("devidas.vgtu.practice@gmail.com");
                mailMessage.To.Add(customerEmail);
                mailMessage.Subject = $"Jūsų apmokėjimas už #{jobName} užsakymą buvo gautas!";
                mailMessage.Body = $"Sveiki, norime pranešti, kad jūsų apmokėjimas už - #{jobName} užsakymą buvo gautas ir jūsų užsakymas bus išsiųstas artimiausiu metu. Sąskaitos faktūrą galite rasti prisijungę prie savo paskyros ir paspaudę ant užsakymo.";

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("devidas.vgtu.practice@gmail.com", "duwgghdsucofagun");
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static void SendJobApproveEmail(string customerEmail, string jobName)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("devidas.vgtu.practice@gmail.com");
                mailMessage.To.Add(customerEmail);
                mailMessage.Subject = $"Jūsų užsakymas #{jobName} buvo patvirtintas!";
                mailMessage.Body = $"Sveiki, norime pranešti, kad jūsų užsakymas - #{jobName} buvo patvirtintas, jo būseną galite stebėti prisijungę prie savo paskyros. Apie paruoštą užsakymą ir apmokėjimo faktūrą pranešime jums atskiru laišku į jūsų paštą kuris yra nurodytas jūsų profilyje.";

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("devidas.vgtu.practice@gmail.com", "duwgghdsucofagun");
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static void SendRejectedEmail(string customerEmail, string jobName)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("devidas.vgtu.practice@gmail.com");
                mailMessage.To.Add(customerEmail);
                mailMessage.Subject = $"Jūsų užsakymas #{jobName} buvo atmestas/atidėtas!";
                mailMessage.Body = $"Sveiki, norime pranešti, kad jūsų užsakymas - #{jobName} buvo atmestas/atidėtas. Dėl daugiau informacijos galite susisiekti su mumis el. paštu arba telefonu. Primename, kad savo užsakymo būseną galite stebėti prisijungę prie savo paskyros.";

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("devidas.vgtu.practice@gmail.com", "duwgghdsucofagun");
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        public static void SendCompletedeEmail(string customerEmail, string jobName)
        {
            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("devidas.vgtu.practice@gmail.com");
                mailMessage.To.Add(customerEmail);
                mailMessage.Subject = $"Jūsų užsakymas #{jobName} buvo sėkmingai įvykdytas!";
                mailMessage.Body = $"Sveiki, norime pranešti, kad jūsų užsakymas - #{jobName} buvo sėkmingai įvykdytas. Primename, kad savo užsakymo būseną galite stebėti prisijungę prie savo paskyros.";

                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("devidas.vgtu.practice@gmail.com", "duwgghdsucofagun");
                smtpClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}


package edu.simpson.holland;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.StringJoiner;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.io.PrintWriter;
import com.google.gson.Gson;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NameListEdit extends HttpServlet
{
    private Pattern firstNameValidPattern;
    private Pattern lastNameValidPattern;
    private Pattern phoneValidPattern;
    private Pattern emailValidPattern;
    private Pattern birthdayValidPattern;

    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    public NameListEdit()
    {
        firstNameValidPattern = Pattern.compile("^[A-Za-z'áéíóúüñ]{1,10}$");
        lastNameValidPattern = Pattern.compile("^[A-Za-z'áéíóúüñ]{1,15}$");
        phoneValidPattern = Pattern.compile("^[0-9]{3}\\-[0-9]{3}\\-[0-9]{4}$");
        emailValidPattern = Pattern.compile("^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$");
        birthdayValidPattern = Pattern.compile("^[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}$");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String firstName = request.getParameter("first");
        String lastName = request.getParameter("last");
        String phone = request.getParameter("phone");
        String email = request.getParameter("email");
        String birthday = request.getParameter("birthday");

        Matcher f1 = firstNameValidPattern.matcher(firstName);
        Matcher f2 = lastNameValidPattern.matcher(lastName);
        Matcher f3 = phoneValidPattern.matcher(phone);
        Matcher f4 = emailValidPattern.matcher(email);
        Matcher f5 = birthdayValidPattern.matcher(birthday);

        String id = request.getParameter("id");

        if (id.equals(""))
        {
            boolean valid = true;

            if (!f1.find())
            {
                valid = false;
                out.println("BAD FIRST");
            }

            if (!f2.find())
            {
                valid = false;
                out.println("BAD LAST");
            }

            if (!f3.find())
            {
                valid = false;
                out.println("BAD PHONE");
            }

            if (!f4.find())
            {
                valid = false;
                out.println("BAD EMAIL");
            }

            if (!f5.find())
            {
                valid = false;
                out.println("BAD BIRTH");
            }

            if (valid)
            {
                Person person = new Person();
                person.setFirst(firstName);
                person.setLast(lastName);
                person.setPhone(phone);
                person.setEmail(email);
                person.setBirthday(birthday);
                PersonDAO.editPerson(person);
                out.println("Passed Validation");
            }

            else out.println("Did not pass validation!");
        }

        else
        {
            Person person = new Person();
            person.setFirst(firstName);
            person.setLast(lastName);
            person.setPhone(phone);
            person.setEmail(email);
            person.setBirthday(birthday);
            person.setId(Integer.parseInt(id));
            PersonDAO.updatePerson(person);
            out.println("Update Successful");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}

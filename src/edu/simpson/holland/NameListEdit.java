package edu.simpson.holland;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.logging.Logger;
import java.util.logging.Level;
import java.io.PrintWriter;
import java.util.List;
import com.google.gson.Gson;

public class NameListEdit extends HttpServlet
{
    private final static Logger log = Logger.getLogger(NameListEdit.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line);

        out.println(requestString);

        Gson gson = new Gson();
        Person person = gson.fromJson(requestString, Person.class);

        out.println(person.getFirst());
        log.log(Level.SEVERE, person.getFirst());
        PersonDAO.editPerson(person);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}

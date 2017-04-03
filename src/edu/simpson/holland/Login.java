package edu.simpson.holland;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Cole on 3/28/2017.
 */
@WebServlet(name = "Login")
public class Login extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String loginID = request.getParameter("loginID");

        out.println(loginID);

        HttpSession login = request.getSession();
        login.setAttribute("loginID", loginID);

        out.println("Done setting the login variable.");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}

package edu.simpson.holland;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

/**
 * Created by Cole on 3/28/2017.
 */
@WebServlet(name = "GetLogin")
public class GetLogin extends HttpServlet
{
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        HttpSession login = request.getSession();
        String loginID = (String)login.getAttribute("loginID");

        out.println("You are logged in as " + loginID + ".");

//        int myCount = 0;
//
//        Integer countObject = (Integer)login.getAttribute("Count");
//        if(countObject !=null)
//            myCount = countObject.intValue();
//
//        Integer newCount = new Integer(myCount + 1);
//        login.setAttribute("Count", newCount);
//
//        double ageInHours = (System.currentTimeMillis() - login.getCreationTime()) / (1000. * 60. * 60.);
//        double lastaccessInHours = (System.currentTimeMillis() - login.getLastAccessedTime()) / (1000. * 60. * 60.);
//
//        out.println(String.format("Login created %.3f hours ago.", ageInHours));
//        out.println(String.format("Last accessed %.3f hours ago", lastaccessInHours));
//
//        out.println("Login Attributes");
//        Enumeration<String> attributes = login.getAttributeNames();
//        while(attributes.hasMoreElements())
//        {
//            String attribute = attributes.nextElement();
//            out.println(String.format(" %s = '%s'", attribute, login.getAttribute(attribute).toString()));
//        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {

    }
}

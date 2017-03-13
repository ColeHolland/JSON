package edu.simpson.holland;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.logging.Logger;

/**
 * Created by Cole on 3/2/2017.
 */
public class NameListDelete extends HttpServlet
{
    private final static Logger log = Logger.getLogger(NameListDelete.class.getName());

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    {
        String id = request.getParameter("id");

        PersonDAO.deletePerson(id);
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataEntities;
using DataEntities.Entities;
using Microsoft.EntityFrameworkCore;
using Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace BussinessLogic
{
    public class AppointmentLogic : IAppointment
    {
     
        AppointmentDbContext context;
        IAppointmentRepo repo;
        public AppointmentLogic(IAppointmentRepo _repo, AppointmentDbContext _context)
        {
            repo = _repo;
            context = _context;

        }

        public Models.Appointment AddAppointment(Models.Appointment appointment)
        {

            return Mapper.Map( repo.AddAppointment(Mapper.Map(appointment)));
        }

        public void EmailFunc(string email, DateTime date, string status)
        {
            repo.EmailToPatient(email, date, status);
        }

        public IEnumerable<Models.Appointment> GetAppointmentsByDate(DateTime date)
        {
            return Mapper.Map(repo.GetAppointmentsByDate(date));
        }

        public IEnumerable<Models.Appointment> GetAppointmentsByDoctor(Guid doctor_id)
        {
            return Mapper.Map(repo.GetAppointmentsByPatient(doctor_id));
        }

        public IEnumerable<Models.Appointment> GetAppointmentsBystatus(DateTime date)
        {
            return Mapper.Map(repo.GetAppointmentsByStatus(date));
        }

        IEnumerable<Models.Appointment> IAppointment.GetAppointmentsByPatient(Guid patient_id)
        {
            return Mapper.Map(repo.GetAppointmentsByPatient(patient_id));
        }

        Models.Appointment IAppointment.UpdateStatus(Guid appointment_id, string status)
        {
            var search = context.Appointments.Where(item => item.AppointmentId == appointment_id).First();

            search.Status = status;

            return Mapper.Map(repo.UpdateStatus(search));
        }
    }
}
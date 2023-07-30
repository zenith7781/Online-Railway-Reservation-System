import httpClient from "./http-common";
class AppService{

    fetchAllTrains()
    {
        return httpClient.get('/trainSearch/getAllTrains');
    }
    deleteTrainByNo(num)
    {
        return httpClient.delete(`/trainSearch/delete/${num}`);
    }
    updateTrain(num,train)
    {
        return httpClient.put(`/trainSearch/updateById/${num}`,train);
    }
    addNewTrain(data)
    {
        return httpClient.post('/trainSearch/saveTrain',data);
    }
    fetchTrains(from,to,date)
    {
        return httpClient.get(`/trainSearch/getTrains/getExactTrain/${date}/${from}/${to}`);
    }
    gettheTrain(id,date)
    {
        return httpClient.get(`/trainSearch/getTrain/specificDate/${date}/${id}`);
    }
    FullTimeTable()
    {
        return httpClient.get('/trainSearch/getTimeTable/All');
    }
    postuser(data)
    {
        return httpClient.post('/users/createUser',data);
    }
    getuser(email)
    {
        return httpClient.get(`/users/findUserByMail/${email}`);
    }
    getduplicateusers(email)
    {
        return httpClient.get(`/users/findDuplicateUsers/${email}`);
    }
    updateUserByEmail(email,data)
    {
        return httpClient.put(`/users/updateUserByMail/${email}`,data);
    }
    savePassenger(data)
    {
        return httpClient.post("/passenger/createPassenger",data);
    }
    removeOnepassenger(id)
    {
        return httpClient.delete(`/passenger/deletePassenger/${id}`);
    }
    getAllPass()
    {
        return httpClient.get("/passenger/getAll");
    }
    removeAll()
    {
        return httpClient.delete("/passenger/removeAll");
    }
    updateTrainSeats(date,data)
    {
        return httpClient.put(`/trainSearch/changeSeat/Train/${date}`,data);
    }
    getPnrTicketNo()
    {
        return httpClient.get("/trainBooking/getPNR/TicketNo");
    }
    setPnrTicketNo()
    {
        return httpClient.put("/trainBooking/setPNR/TicketNumber");
    }
    getTicketbyPNR(pnr)
    {
        return httpClient.get(`/trainBooking/findTicket/PNR/${pnr}`);
    }
    booktheticket(train_no, date, t_class, user, data)
    {
        return httpClient.post(`/trainBooking/bookTicket/${train_no}/${date}/${t_class}/${user}`,data);
    }
    getTicketbyUserId(id)
    {
        return httpClient.get(`/trainBooking/findUserSpecificTickets/${id}`);
    }
    cancelTicket(pnr)
    {
        return httpClient.delete(`/trainBooking/deleteTicket/PNR/${pnr}`);
    }
    getAdmin(username)
    {
        return httpClient.get(`/adminSearch/getAdmin/${username}`);
    }
    updtAdmin(UserName, data)
    {
        return httpClient.put(`adminSearch/updateProfile/${UserName}`,data);
    }
    paymentData(data)
    {
        console.log("Passed Data",data);
        return httpClient.post("/payment/start-payment",data);
    }
}
export default new AppService();
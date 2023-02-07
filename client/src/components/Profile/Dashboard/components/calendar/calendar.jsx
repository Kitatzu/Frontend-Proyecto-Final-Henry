import { useEffect, useState } from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../Utils/Theme/theme";
import Sidebar from "../../Utils/global/Sidebar";
import NavBar from "../../../../NavBar/NavBar";
import { createEvent, deleteEvent, getEvents } from "./events";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState(false);

  const handleDateClick = async (selected) => {
    console.log(selected);
    const title = prompt("Ingresa un titulo para el evento.");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      console.log(selected.dateStr, title);
      const newEvent = await createEvent({ title, date: selected.endStr });
      console.log(newEvent);
      await getEvents(setCurrentEvents);
      calendarApi.addEvent({
        id: newEvent.id,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };
  useEffect(() => {
    getEvents(setCurrentEvents);
  }, []);
  const handleEventClick = async (selected) => {
    console.log(selected);
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      await deleteEvent(selected.event._def.publicId);
      await getEvents(setCurrentEvents);
      selected.event.remove();
    }
  };

  return (
    <Box>
      <NavBar />
      <Box
        display={"flex"}
        width="100%"
        height={"max-content"}
        minHeight="100vh"
      >
        <Sidebar collapsed={false} />
        <Box display="flex" justifyContent={"center"} flexGrow="1">
          <Box m="20px" width={"100%"} flexGrow="1">
            <Header title="Calendario" />

            <Box display="flex" justifyContent="center">
              {/* CALENDAR SIDEBAR */}
              <Box
                flex="1 1 20%"
                backgroundColor={colors.primary[400]}
                p="15px"
                borderRadius="4px"
              >
                <Typography variant="h5">Eventos</Typography>
                <List>
                  {currentEvents
                    ? currentEvents.map((event) => (
                        <ListItem
                          key={event.id}
                          sx={{
                            backgroundColor: colors.greenAccent[500],
                            margin: "10px 0",
                            borderRadius: "2px",
                          }}
                        >
                          <ListItemText
                            primary={event.title}
                            secondary={
                              <Typography>
                                {formatDate(event.start, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))
                    : null}
                </List>
              </Box>

              {/* CALENDAR */}
              <Box ml="15px" flexGrow={"1"}>
                {currentEvents ? (
                  <FullCalendar
                    height="75vh"
                    width="100%"
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      interactionPlugin,
                      listPlugin,
                    ]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    initialEvents={currentEvents}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;

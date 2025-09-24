import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  platform: string;
  content: string;
  status: 'scheduled' | 'published' | 'failed';
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Twitter Post - Product Launch',
      start: new Date(2024, 11, 25, 10, 0),
      end: new Date(2024, 11, 25, 10, 30),
      platform: 'twitter',
      content: 'Exciting news! Our new product is launching today! 🚀',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'LinkedIn Article - Industry Insights',
      start: new Date(2024, 11, 26, 14, 0),
      end: new Date(2024, 11, 26, 14, 30),
      platform: 'linkedin',
      content: 'Here are the top trends shaping our industry in 2024...',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Instagram Story - Behind the Scenes',
      start: new Date(2024, 11, 27, 9, 0),
      end: new Date(2024, 11, 27, 9, 30),
      platform: 'instagram',
      content: 'Take a look behind the scenes at our office! 📸',
      status: 'scheduled'
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const platformColors = {
    twitter: '#1DA1F2',
    linkedin: '#0077B5',
    instagram: '#E4405F',
  };

  const statusColors = {
    scheduled: '#F59E0B',
    published: '#10B981',
    failed: '#EF4444',
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    const backgroundColor = platformColors[event.platform as keyof typeof platformColors];
    const style = {
      backgroundColor,
      borderRadius: '8px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '12px',
      padding: '2px 8px',
    };
    return { style };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(e => e.id !== eventId));
    setShowModal(false);
    toast.success('Post deleted successfully!');
  };

  const handlePublishNow = (event: CalendarEvent) => {
    setEvents(events.map(e => 
      e.id === event.id 
        ? { ...e, status: 'published' as const }
        : e
    ));
    setShowModal(false);
    toast.success('Post published successfully!');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Content Calendar
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and schedule your social media posts
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
            <PlusIcon className="h-4 w-4" />
            <span>New Post</span>
          </button>
        </div>

        {/* Legend */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-4 border border-white/20 mb-6">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-700">Platforms:</span>
            {Object.entries(platformColors).map(([platform, color]) => (
              <div key={platform} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm text-gray-600 capitalize">{platform}</span>
              </div>
            ))}
            <span className="text-sm font-medium text-gray-700 ml-6">Status:</span>
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm text-gray-600 capitalize">{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-white/20">
          <div style={{ height: '600px' }}>
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
              views={['month', 'week', 'day']}
              defaultView="month"
              popup
              className="custom-calendar"
            />
          </div>
        </div>

        {/* Event Modal */}
        {showModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedEvent.title}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-700">Platform: </span>
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: platformColors[selectedEvent.platform as keyof typeof platformColors] }}
                  >
                    {selectedEvent.platform}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Status: </span>
                  <span 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: statusColors[selectedEvent.status] }}
                  >
                    {selectedEvent.status}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Scheduled: </span>
                  <span className="text-sm text-gray-900">
                    {moment(selectedEvent.start).format('MMMM D, YYYY [at] h:mm A')}
                  </span>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-700">Content:</span>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedEvent.content}</p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => handlePublishNow(selectedEvent)}
                    disabled={selectedEvent.status === 'published'}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {selectedEvent.status === 'published' ? 'Published' : 'Publish Now'}
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .custom-calendar .rbc-event {
          border-radius: 8px !important;
          padding: 2px 8px !important;
        }
        
        .custom-calendar .rbc-toolbar {
          margin-bottom: 20px;
        }
        
        .custom-calendar .rbc-toolbar button {
          color: #374151;
          border: 1px solid #d1d5db;
          background: white;
          padding: 8px 16px;
          border-radius: 8px;
          margin: 0 2px;
        }
        
        .custom-calendar .rbc-toolbar button:hover {
          background: #f3f4f6;
        }
        
        .custom-calendar .rbc-toolbar button.rbc-active {
          background: #8b5cf6;
          color: white;
          border-color: #8b5cf6;
        }
        
        .custom-calendar .rbc-month-view,
        .custom-calendar .rbc-time-view {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }
        
        .custom-calendar .rbc-header {
          background: #f9fafb;
          color: #374151;
          font-weight: 600;
          padding: 12px 8px;
        }
      `}</style>
    </div>
  );
};

export default Calendar;
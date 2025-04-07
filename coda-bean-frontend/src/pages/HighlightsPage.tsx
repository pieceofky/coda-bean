export default function HighlightsPage() {
    const highlightEvents = [
        { id: 1, title: 'Jazz Night', description: 'Live jazz performance.', date: 'Nov 10, 7 PM' },
        { id: 2, title: 'Art Exhibition', description: 'Local artist showcase.', date: 'Nov 15, 6 PM' },
        { id: 3, title: 'Board Game Tournament', description: 'Strategy and fun.', date: 'Nov 18, 2 PM' },
        { id: 4, title: 'Classic Film Screening', description: 'Enjoy a timeless movie.', date: 'Nov 22, 8 PM' },
        { id: 5, title: 'Book Club Meeting', description: 'Discuss the latest read.', date: 'Nov 25, 7 PM' },
        { id: 6, title: 'Instrumental Music Set', description: 'Relaxing instrumental music.', date: 'Nov 30, 7:30 PM' },
    ];

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-4xl font-bold mb-8 text-center">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {highlightEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-lg mb-2">{event.description}</p>
                        <p className="text-sm">{event.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
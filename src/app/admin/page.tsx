export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif text-gray-900">Dashboard</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center py-20">
                <h2 className="text-xl text-gray-500 mb-4">Welcome to the Adverbe CMS</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    Select a module from the sidebar to manage content.
                    Currently, only basic view/edit functionality will be implemented.
                </p>
            </div>
        </div>
    );
}

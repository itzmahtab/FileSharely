export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center space-y-1">
                <p className="text-xl text-slate-500">
                    &copy; {year} FileHub. All rights reserved.
                </p>
                <p className="text-sm text-slate-400">
                    File Sharing Made Simple
                </p>
            </div>
        </footer>
    );
}

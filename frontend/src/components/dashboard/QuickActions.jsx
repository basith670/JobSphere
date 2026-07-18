import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

export default function QuickActions() {

    const { searchTerm } = useSearch();

    const actions = [
        {
            id: 1,
            title: "Upload Resume",
            to: "/resumes",
            className: "primary-btn",
            keywords: "resume upload cv",
        },
        {
            id: 2,
            title: "Browse Jobs",
            to: "/jobs",
            className: "secondary-btn",
            keywords: "jobs browse vacancies career",
        },
        {
            id: 3,
            title: "Complete Profile",
            to: "/profile",
            className: "secondary-btn",
            keywords: "profile account completion",
        },
    ];

    const filteredActions = actions.filter((action) => {

      if (!searchTerm.trim()) return true;
  
      const searchWords = searchTerm
          .toLowerCase()
          .split(" ")
          .filter(Boolean);
  
      const searchableText = `
          ${action.title}
          ${action.keywords}
      `.toLowerCase();
  
      return searchWords.every(word =>
          searchableText.includes(word)
      );
  
  });

    if (filteredActions.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                display: "flex",
                gap: "16px",
                margin: "30px 0",
                flexWrap: "wrap",
            }}
        >
            {filteredActions.map((action) => (
                <Link
                    key={action.id}
                    to={action.to}
                    className={action.className}
                >
                    {action.title}
                </Link>
            ))}
        </div>
    );
}
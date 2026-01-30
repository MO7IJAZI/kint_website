import { getPages } from "@/actions/pageActions";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

/**
 * Props type for this page
 */
type AdminPagesProps = {
    searchParams?: {
        status?: "active" | "inactive";
        q?: string;
    };
};

const AdminPages = async ({ searchParams }: AdminPagesProps) => {
    const pages = await getPages();

    // استخدام فعلي لـ props (مهم للبناء + ESLint)
    const statusFilter = searchParams?.status;
    const searchQuery = searchParams?.q?.toLowerCase();

    const filteredPages = pages.filter((page) => {
        if (statusFilter === "active" && !page.isActive) return false;
        if (statusFilter === "inactive" && page.isActive) return false;

        if (searchQuery) {
            return page.title.toLowerCase().includes(searchQuery);
        }

        return true;
    });

    return (
        <div>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2.5rem",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                        Pages Management
                    </h1>
                    <p style={{ color: "var(--muted-foreground)" }}>
                        Manage static pages like Company Profile.
                    </p>
                </div>

                <Link href="/admin/pages/new" className="btn btn-primary">
                    New Page
                </Link>
            </div>

            {/* Table */}
            <div className="card" style={{ overflow: "hidden" }}>
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "left",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                backgroundColor: "#f9fafb",
                                borderBottom: "1px solid var(--border)",
                            }}
                        >
                            <th style={{ padding: "1rem 1.5rem" }}>Title</th>
                            <th style={{ padding: "1rem 1.5rem" }}>URL Slug</th>
                            <th style={{ padding: "1rem 1.5rem" }}>Status</th>
                            <th
                                style={{
                                    padding: "1rem 1.5rem",
                                    textAlign: "right",
                                }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredPages.map((page) => (
                            <tr
                                key={page.id}
                                style={{
                                    borderBottom: "1px solid var(--border)",
                                }}
                            >
                                <td style={{ padding: "1rem 1.5rem" }}>
                                    <strong>{page.title}</strong>
                                </td>

                                <td style={{ padding: "1rem 1.5rem" }}>
                                    <code>/{page.slug}</code>
                                </td>

                                <td style={{ padding: "1rem 1.5rem" }}>
                                    {page.isActive ? "Active" : "Inactive"}
                                </td>

                                <td
                                    style={{
                                        padding: "1rem 1.5rem",
                                        textAlign: "right",
                                    }}
                                >
                                    <Link
                                        href={`/admin/pages/${page.id}`}
                                        style={{ marginRight: "1rem" }}
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton id={page.id} type="page" />
                                </td>
                            </tr>
                        ))}

                        {filteredPages.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    style={{ padding: "3rem", textAlign: "center" }}
                                >
                                    No pages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPages;

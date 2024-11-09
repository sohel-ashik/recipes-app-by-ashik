
export const metadata = {
  title: "all-recipes",
  description: "This is for viewing all recipes",
};

export default function AllRecipesLayout({ children }) {
  return (
    <div>
      <div className="pt-20 lg:pt-24"><h1 className="text-4xl font-bold text-center mb-6">All Recipes</h1></div>
      {children}
    </div>
  );
}

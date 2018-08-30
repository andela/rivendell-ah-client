import Article from './Article';
const SubcategoryArticles = () => (
    <div>
        <h2>Articles in a Subcategory</h2>
        <Switch>
            <Route exact path='/:subcategory/:slug' component={Article} />
        </Switch>
    </div>
);
export default SubcategoryArticles;
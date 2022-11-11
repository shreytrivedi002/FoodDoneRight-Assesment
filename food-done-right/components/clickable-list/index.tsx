const ClickableList = ({ list, onClick }: any) => {
    const listItems =
        list?.map((item, idx) => <button key={idx} type="button" onClick={() => onClick(item)} className="list-group-item list-group-item-action">{item?.name + ',' + item?.country + ',' + item?.continent}</button>)

    return (
        <div className="list-group mt-4">
            <h6>Click on desired location listed below: </h6>
            {listItems}
            <div className="d-flex justify-content-end txt-light">
                <p className="text-warning">*these are the locations matching your input</p>
            </div>
        </div>
    );
}

export default ClickableList;
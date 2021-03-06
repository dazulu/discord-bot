export const constrainDimensions = (
    width: number,
    height: number,
    constraint: number
): { constrainedWidth: number; constrainedHeight: number } => {
    let constrainedWidth, constrainedHeight;

    if (width > height) {
        if (width > constraint) {
            constrainedWidth = constraint;
            constrainedHeight = height * (constraint / width);
        } else {
            constrainedWidth = width;
            constrainedHeight = height;
        }
    } else if (height > width) {
        if (height > constraint) {
            constrainedHeight = constraint;
            constrainedWidth = width * (constraint / height);
        } else {
            constrainedWidth = width;
            constrainedHeight = height;
        }
    } else {
        if (width > constraint) {
            constrainedWidth = constraint;
            constrainedHeight = constraint;
        } else {
            constrainedWidth = width;
            constrainedHeight = height;
        }
    }

    return { constrainedWidth, constrainedHeight };
};

type BoundingBox = {
    Height: number;
    Left: number;
    Top: number;
    Width: number;
};

type Instance = {
    BoundingBox: BoundingBox;
    Confidence: number;
};

type Category = {
    Name: string;
};

type Label = {
    Aliases: string[];
    Categories: Category[];
    Confidence: number;
    Instances: Instance[];
    Name: string;
    Parents: { Name: string }[];
};

type Metadata = {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
};

export type Message = {
    $metadata: Metadata;
    LabelModelVersion: string;
    Labels: Label[];
};

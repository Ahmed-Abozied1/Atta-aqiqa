interface ProductDescriptionProps {
  location?: string;  
}

export const ProductDescription = ({ location }: ProductDescriptionProps) => {
  return (
    <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6">
      <p className="text-regular-normal md:text-large-normal text-paragraph leading-relaxed">
        {location === "INSIDE_EGYPT" ? (
          "حضرتك تقدر تحجز اضحيتك وتحضرها كمان ب مزرعتنا داخل مصر"
        ) : (
          "بنوثق لحضرتك العقيقه او الصدقه او الاضحيه فيديو الذبح كامل ، وتوزيع الاطعام ، والطهى بالاسم والصوره كأنك موجود"
        )}
      </p>
    </div>
  );
};
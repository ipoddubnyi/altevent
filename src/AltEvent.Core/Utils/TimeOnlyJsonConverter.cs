using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AltEvent.Core.Utils
{
    public class TimeOnlyJsonConverter : JsonConverter<TimeOnly>
    {
        private const string Format = "HH:mm";

        public override TimeOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var str = reader.GetString();
            if (str == null)
                throw new ApplicationException("Value cannot be null");

            return TimeOnly.ParseExact(str, Format, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, TimeOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(Format, CultureInfo.InvariantCulture));
        }
    }
}
